import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { I18nManager } from "react-native";

// Import translations
import en from "../../translations/en.json"; // English
import tr from "../../translations/tr.json"; // Turkish
import ar from "../../translations/ar.json"; // Arabic
import de from "../../translations/de.json"; // German
import es from "../../translations/es.json"; // Spanish
import hi from "../../translations/hi.json"; // Hindi
import id from "../../translations/id.json"; // Indonesian
import pt from "../../translations/pt-BR.json"; // Portuguese (Brazil)
import ru from "../../translations/ru.json"; // Russian
import ja from "../../translations/ja.json"; // Japanese
import zh from "../../translations/zh-Hans.json"; // Chinese (Simplified)
import fr from "../../translations/fr.json"; // French
import ko from "../../translations/ko.json"; // Korean
import pl from "../../translations/pl.json"; // Polish
import it from "../../translations/it.json"; // Italian
import vi from "../../translations/vi.json"; // Vietnamese
import sv from "../../translations/sv.json"; // Swedish
import nl from "../../translations/nl.json"; // Dutch
import ro from "../../translations/ro.json"; // Romanian
import cs from "../../translations/cs.json"; // Czech

const translations = {
  en,
  tr,
  ar,
  de,
  es,
  hi,
  id,
  pt,
  ru,
  ja,
  zh,
  fr,
  ko,
  pl,
  it,
  vi,
  sv,
  nl,
  ro,
  cs,
};

const i18n = new I18n(translations);

// Initialize with device language first
const deviceLanguage = getLocales()[0].languageCode;
i18n.locale = deviceLanguage || "en";
i18n.enableFallback = true;

// Handle RTL
const isRTL = i18n.locale === "ar" || getLocales()[0].textDirection === "rtl";
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export const changeLanguage = (lang: string) => {
  i18n.locale = lang;
  const isRTL = lang === "ar";
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
};

export default i18n;
