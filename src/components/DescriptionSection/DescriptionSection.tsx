const DescriptionSection = () => {
  return (
    <div className="py-10 md:py-20 bg-background">
      <div className="px-4">
        <div className="md:max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-accent cursor-default">
            ¿Cómo nace el mocha tour?
          </h2>
          <p className="text-lg text-foreground leading-relaxed cursor-default">
            El mocha tour es un proyecto personal que nació como una forma de
            compartir conmigo misma, salir a descubrir cafeterías, recorrer la
            ciudad, leer, tomar un rico café y acompañarlo con algo dulce.
            <br />
            Hoy se transforma en esta pequeña guía para quienes disfruten del
            mocha y la repostería. Hasta la fecha he visitado 27 cafeterías,
            todas, excepto una, emplazadas en la comuna de Providencia en
            Santiago de Chile.
          </p>
        </div>
      </div>
    </div>
  );
};

export { DescriptionSection };
