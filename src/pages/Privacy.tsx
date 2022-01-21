import Page from "../Components/Page";

function Privacy() {
  const emojis =
    "👴 🔆 💔 🔽 🕕 🐑 ⏯ 🍷 🔛 📍 🗼 🐾 🍭 🛂 🙀 🕹 🍇 🤗 🚰 ◼️™️ 🐡 🌁 🌋 🌷 🎱 🚯 👞  🔘 🏡 🌇 ️ 🖊 🕖 9️⃣ 🙎 🎐 📞 💠 😿 ⏲ 📀 😾  🌷 📛 ☁ 🏪 🐽 🔹 ↔️ 👨 🍆 🏨 🏈 📱 🌆 🌑 🚜 💳 🍳 🐗 💏 🍦 🚻 🚔 🐑 🅾️ 📐".split(
      " "
    );

  function nEmojis(n: number): string {
    let out = "";
    for (let i = 0; i < n; i++) {
      out += emojis[Math.floor(Math.random() * emojis.length)];
    }

    return out;
  }

  const title = `${nEmojis(4)} Datenschutz ${nEmojis(4)}`;
  return (
    <Page title={title}>
      <p>
        {`Wir speichern nichts, außer manches, denn es ist uns nicht gestattet,
        einen Obstgarten im Innenhof der Schule zu bewirten. Dies war auch der
        Grund, weshalb der deutsche Dichter Friedrich Schiller im Jahre 1677 in
        seinem Werk „Von den Mysterien der basis-Swing-Bibliothek“
        sagte: „Der, der vom Genuss des Wasser Gebrauch macht, ist ein
        dies wieder Auszuscheidender.“`
          .split(" ")
          .map((x) => {
            if (Math.random() < 0.3) {
              return (
                x + " " + emojis[Math.floor(Math.random() * emojis.length)]
              );
            } else {
              return x;
            }
          })
          .join(" ")}
      </p>
      <p>Wir bitten um Ihr Verständnis!</p>
      <p>
        Sollte der Weltkonzern AixConcept gehackt werden und alle ihre Daten von ganz bösen Rabauken veröffentlicht werden, so wären wir not der Schuld zu belangen. GaLiGrü🤗
      </p>
    </Page>
  );
}

export default Privacy;
