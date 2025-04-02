import i18n from "./i18n";

export const handleFirebaseError = (error: string): string => {
  switch (error) {
    case "auth/email-already-in-use":
      return i18n.t("firebaseErrors.emailAlreadyInUse");
    case "auth/invalid-email":
      return i18n.t("firebaseErrors.invalidEmail");
    case "auth/weak-password":
      return i18n.t("firebaseErrors.weakPassword");
    case "auth/user-not-found":
      return i18n.t("firebaseErrors.userNotFound");
    case "auth/wrong-password":
      return i18n.t("firebaseErrors.wrongPassword");
    // Add more cases as needed
    default:
      return i18n.t("firebaseErrors.default");
  }
};
