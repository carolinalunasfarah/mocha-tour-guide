import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import { FormCheckboxes } from "@/components/FormCheckboxes";
import { FormCommonFields } from "@/components/FormCommonFields";
import { MochaSection } from "@/components/MochaSection";
import { FoodSection } from "@/components/FoodSection";
import { VisitedSection } from "@/components/VisitedSection";

import { FormData } from "./types";
import { DefaultFormData } from "./defaultData";

const DataForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mochaHandleSubmitRef = useRef<
    ((data: FormData) => Promise<void>) | null
  >(null);
  const foodHandleSubmitRef = useRef<
    ((data: FormData) => Promise<void>) | null
  >(null);
  const visitedHandleSubmitRef = useRef<
    ((data: FormData) => Promise<void>) | null
  >(null);

  const form = useForm<FormData>({
    defaultValues: DefaultFormData,
  });

  const createMocha = form.watch("createMocha");
  const createFood = form.watch("createFood");
  const createVisited = form.watch("createVisited");
  const name = form.watch("name");
  const nameLowercase = form.watch("nameLowercase");
  const rating = form.watch("rating");
  const mochaRatingField = form.watch("mochaRating");

  const mochaRating = createMocha && createFood ? mochaRatingField : rating;
  // Si hay mocha, usar su rating; si no, usar el rating general
  const visitedRating = createMocha ? mochaRating : rating;

  useEffect(() => {
    if (name) {
      form.setValue("nameLowercase", name.toLowerCase());
    } else {
      form.setValue("nameLowercase", "");
    }
  }, [name, form]);

  useEffect(() => {
    if (createMocha) {
      const currentRating = form.getValues("rating");
      if (currentRating !== mochaRating) {
        form.setValue("rating", mochaRating, { shouldValidate: false });
      }
    }
  }, [createMocha, mochaRating, form]);

  const onSubmit = async (data: FormData) => {
    const promises: Promise<void>[] = [];
    const messages: string[] = [];

    if (data.createMocha && mochaHandleSubmitRef.current) {
      promises.push(
        mochaHandleSubmitRef.current(data).then(() => {
          messages.push("Mocha");
        }),
      );
    }

    if (data.createFood && foodHandleSubmitRef.current) {
      promises.push(
        foodHandleSubmitRef.current(data).then(() => {
          messages.push("Food");
        }),
      );
    }

    if (
      (data.createVisited || data.createMocha) &&
      visitedHandleSubmitRef.current
    ) {
      promises.push(
        visitedHandleSubmitRef.current(data).then(() => {
          messages.push("Visited");
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

          {(createMocha || createFood || createVisited) && (
            <FormCommonFields
              register={form.register}
              errors={form.formState.errors}
              nameLowercase={nameLowercase}
            />
          )}

          {createMocha && (
            <MochaSection
              register={form.register}
              errors={form.formState.errors}
              otherEntityExists={createFood}
              onSubmitReady={(handleSubmit) => {
                mochaHandleSubmitRef.current = handleSubmit;
              }}
            />
          )}

          {(createVisited || createMocha) && (
            <VisitedSection
              rating={visitedRating}
              nameLowercase={nameLowercase}
              isMochaActive={createMocha}
              register={form.register}
              errors={form.formState.errors}
              onSubmitReady={(handleSubmit) => {
                visitedHandleSubmitRef.current = handleSubmit;
              }}
            />
          )}

          {createFood && (
            <FoodSection
              register={form.register}
              errors={form.formState.errors}
              otherEntityExists={createMocha}
              onSubmitReady={(handleSubmit) => {
                foodHandleSubmitRef.current = handleSubmit;
              }}
            />
          )}

          <Button type="submit" className="w-full">
            Crear
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { DataForm };
