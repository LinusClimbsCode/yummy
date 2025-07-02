export default function RecipeCardDescription() {
  return (
    <>
      {' '}
      {/* Preparation Section */}
      <article className="card w-full bg-base-100 shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">Zubereitung</h2>

          {/* Timing Information */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="badge badge-outline flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Arbeitszeit ca. 40 Minuten
            </div>
            <div className="badge badge-outline flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Koch-/Backzeit ca. 30 Minuten
            </div>
            <div className="badge badge-outline flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Gesamtzeit ca. 1 Stunde 10 Minuten
            </div>
          </div>

          {/* Instructions */}
          <div className="prose max-w-none">
            <p>
              Für den Schupfnudelteig die Kartoffeln in der Schale ca. 25
              Minuten in reichlich Salzwasser gar kochen und zum leichteren
              Pellen mit kaltem Wasser abschrecken. Für die Schupfnudeln einen
              großen Topf mit Wasser aufstellen.
            </p>
            <p>
              Die noch warmen Kartoffeln pellen und sofort durch eine
              Kartoffelpresse drücken. Mit Salz und frisch geriebener Muskatnuss
              würzen und mit Mehl, Ei und Eigelb zügig zu einem geschmeidigen
              Teig verarbeiten.
            </p>
            <p>
              Den Teig auf einer mit Mehl bestäubten Arbeitsfläche in vier Teile
              teilen und zu gleichmäßigen Strängen rollen (ca. 1,5 cm dick).
              Anschließend mit einem Messer oder einer Teigkarte ca. 2 cm große
              Teigstücke von der Rolle schneiden und mit den Händen zu Kugeln
              rollen. Aus diesen Kugeln werden die Schupfnudeln geformt. Die
              Stücke werden „geschupft", sprich sie werden zwischen den
              Handinnenflächen oder auf einem Holzbrett mit einer leicht
              gewölbten Hand in die typische Schupfnudel-Form gerollt.
            </p>
            <p>
              Die fertigen Schupfnudeln in reichlich kochendem Salzwasser ca. 5
              Minuten garen, bis sie an die Oberfläche steigen und dann die
              Temperatur herunterstellen und noch 2 Minuten ziehen lassen. Mit
              einer Schaumkelle herausnehmen, auf ein geöltes Blech geben und
              erkalten lassen. Das Öl verhindert, dass die Schupfnudeln
              zusammenkleben.
            </p>
            <p>
              Die Schupfnudeln in aufgeschäumter Butter kurz anbraten, leicht
              salzen und sofort servieren.
            </p>
          </div>

          {/* Recipe Tags */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-secondary">Vegetarisch</span>
              <span className="badge badge-secondary">Beilage</span>
              <span className="badge badge-secondary">
                raffiniert oder preiswert
              </span>
              <span className="badge badge-secondary">einfach</span>
              <span className="badge badge-secondary">Kartoffel</span>
              <span className="badge badge-secondary">gekocht</span>
            </div>
          </div>

          {/* Recipe Author */}
          <div className="mt-8 pt-6 border-t border-base-300">
            <h3 className="text-lg font-semibold mb-4">Recipie from</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img
                    src="https://api.chefkoch.de/v2/users/c52041a5bc6b63e2db75c02c2923ae0d/avatar/crop-80x80"
                    alt="Profilbild von Chefkoch_Viki"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Chefkoch_Viki</h4>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
