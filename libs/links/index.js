const puppeteer = require("puppeteer");
const auth = require("../../helpers/auth");
const deleteAction = require("./delete");
const setAction = require("./set");

module.exports = async (logger, { userAgent }) => {
  await Promise.all([
    (async () => {
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-background-timer-throttling",
          "--disable-renderer-backgrounding",
          "--override-plugin-power-saver-for-testing=never",
          "--disable-extensions-http-throttling"
        ]
      });

      let config = {
        userAgent,
        ...(await auth(browser, { userAgent }))
      };

      while (1) {
        try {
          // удаляем спамные сслыки
          await deleteAction(browser, logger, config);
        } catch (e) {
          logger.error(
            "Ошибка при удаление спамных ссылок",
            (e && e.response && e.response.data) || e
          );
          if (e.error && e.error.code === "AUTHORIZATION_REQUIRED") {
            config = {
              userAgent,
              ...(await auth(browser, { userAgent }))
            };
          }
        }
        // каждые 15 сек
        await new Promise(res => setTimeout(res, 15 * 1000));
      }
      await browser.close();
    })(),
    (async () => {
      while (1) {
        const browser = await puppeteer.launch({
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-background-timer-throttling",
            "--disable-renderer-backgrounding",
            "--override-plugin-power-saver-for-testing=never",
            "--disable-extensions-http-throttling"
          ]
        });

        let config = {
          userAgent,
          ...(await auth(browser, { userAgent }))
        };

        while (1) {
          try {
            // ставим спамные ссылки
            await setAction(browser, logger, config);
          } catch (e) {
            logger.error(
              "Ошибка при установки спамных ссылок",
              (e && e.response && e.response.data) || e
            );
            if (e.error && e.error.code === "AUTHORIZATION_REQUIRED") {
              config = {
                userAgent,
                ...(await auth(browser, { userAgent }))
              };
            }
          }
          //
          await new Promise(res => setTimeout(res, 1 * 1000));
        }
        await browser.close();
      }
    })()
  ]);
};
