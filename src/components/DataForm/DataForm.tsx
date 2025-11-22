import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GeoPoint } from "firebase/firestore";
import { useCreateMocha } from "@/modules/mochas/hooks/useCreateMocha";
import { useCreateFood } from "@/modules/food/hooks/useCreateFood";
import { useCreateVisited } from "@/modules/visited/hooks/useCreateVisited";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FormCheckboxes } from "@/components/FormCheckboxes";
import { FormCommonFields } from "@/components/FormCommonFields";
import { FormMochaFoodFields } from "@/components/FormMochaFoodFields";
import { VisitedFields } from "@/components/VisitedFields";
import type { FormData } from "./types";

const DataForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createMochaMutation = useCreateMocha();
  const createFoodMutation = useCreateFood();
  const createVisitedMutation = useCreateVisited();

  const form = useForm<FormData>({
    defaultValues: {
      createMocha: false,
      createFood: false,
      createVisited: false,
      name: "",
      address: "",
      latitude: 0,
      longitude: 0,
      description: "",
      imgUrl: "",
      rating: 1,
      mochaDescription: "",
      mochaImgUrl: "",
      mochaRating: 1,
      foodDescription: "",
      foodImgUrl: "",
      foodRating: 1,
      nameLowercase: "",
    },
  });

  const createMocha = form.watch("createMocha");
  const createFood = form.watch("createFood");
  const createVisited = form.watch("createVisited");
  const name = form.watch("name");
  const nameLowercase = form.watch("nameLowercase");
  const mochaRating = form.watch(
    createMocha && createFood ? "mochaRating" : "rating",
  );

  // Actualizar nameLowercase automáticamente cuando cambia el nombre
  useEffect(() => {
    if (createVisited && name) {
      form.setValue("nameLowercase", name.toLowerCase());
    } else if (!name) {
      form.setValue("nameLowercase", "");
    }
  }, [name, createVisited, form]);

  // Sincronizar rating de visited con el de mocha (siempre)
  useEffect(() => {
    if (createVisited && createMocha) {
      const currentMochaRating = createFood
        ? form.getValues("mochaRating")
        : form.getValues("rating");
      form.setValue("rating", currentMochaRating);
    }
  }, [createVisited, createMocha, createFood, mochaRating, form]);

  const onSubmit = async (data: FormData) => {
    const promises: Promise<void>[] = [];
    const messages: string[] = [];

    // Crear mocha si está marcado
    if (data.createMocha) {
      const mochaDescription = data.createFood
        ? data.mochaDescription
        : data.description;
      const mochaImgUrl = data.createFood ? data.mochaImgUrl : data.imgUrl;
      const mochaRating = data.createFood ? data.mochaRating : data.rating;

      if (!mochaDescription || !mochaImgUrl) {
        setErrorMessage(
          "Para crear mocha, la descripción y URL de imagen son requeridas",
        );
        setSuccessMessage(null);
        return;
      }

      promises.push(
        new Promise<void>((resolve, reject) => {
          createMochaMutation.mutate(
            {
              name: data.name,
              address: data.address,
              description: mochaDescription,
              imgUrl: mochaImgUrl,
              rating: mochaRating,
              location: new GeoPoint(data.latitude, data.longitude),
            },
            {
              onSuccess: () => {
                messages.push("Mocha");
                resolve();
              },
              onError: (error) => {
                reject(
                  new Error(
                    `Error al crear mocha: ${
                      error instanceof Error
                        ? error.message
                        : "Error desconocido"
                    }`,
                  ),
                );
              },
            },
          );
        }),
      );
    }

    // Crear food si está marcado
    if (data.createFood) {
      const foodDescription = data.createMocha
        ? data.foodDescription
        : data.description;
      const foodImgUrl = data.createMocha ? data.foodImgUrl : data.imgUrl;
      const foodRating = data.createMocha ? data.foodRating : data.rating;

      if (!foodDescription || !foodImgUrl) {
        setErrorMessage(
          "Para crear food, la descripción y URL de imagen son requeridas",
        );
        setSuccessMessage(null);
        return;
      }

      promises.push(
        new Promise<void>((resolve, reject) => {
          createFoodMutation.mutate(
            {
              name: data.name,
              address: data.address,
              description: foodDescription,
              imgUrl: foodImgUrl,
              rating: foodRating,
              location: new GeoPoint(data.latitude, data.longitude),
            },
            {
              onSuccess: () => {
                messages.push("Food");
                resolve();
              },
              onError: (error) => {
                reject(
                  new Error(
                    `Error al crear food: ${
                      error instanceof Error
                        ? error.message
                        : "Error desconocido"
                    }`,
                  ),
                );
              },
            },
          );
        }),
      );
    }

    // Crear visited si está marcado
    if (data.createVisited) {
      if (!data.name || !data.nameLowercase) {
        setErrorMessage("Para crear visited, el nombre es requerido");
        setSuccessMessage(null);
        return;
      }

      // El rating de visited siempre es el del mocha
      const visitedRating = data.createFood ? data.mochaRating : data.rating;

      promises.push(
        new Promise<void>((resolve, reject) => {
          createVisitedMutation.mutate(
            {
              name: data.name,
              location: new GeoPoint(data.latitude, data.longitude),
              rating: visitedRating,
              nameLowercase: data.nameLowercase,
            },
            {
              onSuccess: () => {
                messages.push("Visited");
                resolve();
              },
              onError: (error) => {
                reject(
                  new Error(
                    `Error al crear visited: ${
                      error instanceof Error
                        ? error.message
                        : "Error desconocido"
                    }`,
                  ),
                );
              },
            },
          );
        }),
      );
    }

    if (promises.length === 0) {
      setErrorMessage("Debes seleccionar al menos un tipo para crear");
      setSuccessMessage(null);
      return;
    }

    try {
      await Promise.all(promises);
      form.reset();
      setSuccessMessage(
        `${messages.join(", ")} ${
          messages.length > 1 ? "creados" : "creado"
        } exitosamente`,
      );
      setErrorMessage(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Error desconocido",
      );
      setSuccessMessage(null);
    }
  };

  const isLoading =
    createMochaMutation.isPending ||
    createFoodMutation.isPending ||
    createVisitedMutation.isPending;

  const showCommonFields = createMocha || createFood || createVisited;
  const showSpecificFields = createMocha || createFood;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="cursor-default">Crear Nueva Entrada</CardTitle>
      </CardHeader>
      <CardContent>
        {successMessage && (
          <div className="mb-4 p-3 rounded-md bg-green-500/10 border border-green-500/20">
            <p className="text-sm text-green-600 dark:text-green-400 cursor-default">
              {successMessage}
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive cursor-default">
              {errorMessage}
            </p>
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormCheckboxes register={form.register} />

          {showCommonFields && (
            <FormCommonFields
              register={form.register}
              errors={form.formState.errors}
            />
          )}

          {showSpecificFields && (
            <>
              {createMocha && createFood ? (
                <>
                  <div className="p-4 border rounded-md space-y-4 bg-muted/30">
                    <h3 className="font-semibold text-base cursor-default">
                      Mocha
                    </h3>
                    <FormMochaFoodFields
                      register={form.register}
                      errors={form.formState.errors}
                      prefix="mocha"
                    />
                  </div>
                  <div className="p-4 border rounded-md space-y-4 bg-muted/30">
                    <h3 className="font-semibold text-base cursor-default">
                      Food
                    </h3>
                    <FormMochaFoodFields
                      register={form.register}
                      errors={form.formState.errors}
                      prefix="food"
                    />
                  </div>
                </>
              ) : (
                <FormMochaFoodFields
                  register={form.register}
                  errors={form.formState.errors}
                />
              )}
            </>
          )}

          {createVisited && (
            <VisitedFields rating={mochaRating} nameLowercase={nameLowercase} />
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creando..." : "Crear"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { DataForm };
