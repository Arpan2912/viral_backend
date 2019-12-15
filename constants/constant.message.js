// put all messages here
module.exports = {
  common: {
    defaultErrorMessage: "Something went wrong",
    emailNotFound: "Email is compulsory",
    emailNotValid: "Email not valid",
    firstNameNotFound: "First name is compulsory",
    lastNameNotFound: "Last name is compulsory",
    eventNotFound: "event not found",
    eventIdCompulsory: "Event id is compulsory",
    invalidEventId: "Event id is not valid",
    eventFeatureIdNotFound: "Event feature id not found",
    eventFeatureIdCompulsory: "Event feature id is compulsory",
    invalidEventFeatureId: "Event feature  id is not valid",
    documentIdCompulsory: "Document id is compulsory",
    invalidDocumentId: "Document id is not valid",
    documentAddSuccess: "document uploaded successfully",
    documentDeleteSuccess: "document deleted successfully",
    imageUploadSuccess: "image uploaded successfully"
  },
  auth: {
    loginSuccess: "Login succeess",
    googleCodeCompulsory: "Code is compulsory",
    phoneNotFound: "Phone number is compulsory",
    passwordNotFound: "Password is compulsory",
    signupSuccess: "Signup success, Please verify your email address",
    tokenNotFound: "Token not found",
    tokenExpired: "Token Expired",
    invalidToken: "Token is not valid",
    userVerifiedSuccess: "User verified successfully",
    passwordResetSuccess: "Reset password successfully",
    forgotPasswordLinkSent: "Forgot password link has been sent to your email",
    passwordUpdateSuccess: "Password updated successfuly",
    deviceTokenNotFound: "Device token is compulsory",
    logoutSuceess: "logout success",
    userNotExist: "User does not exist",
    deletedUserByAdmin: "User is removed by admin",
    verifyEmail: "Please verify your email address",
    inactiveUser: "User is inactive",
    incorrectCredential: "Please enter correct email id or password",
    userAlreadyExist: "User already exist"
  },
  user: {
    updateLastAccess: "Last login updated successfully"
  },
  event: {
    eventNotFound: "event not found",
    eventIdCompulsory: "Event id is compulsory",
    invalidEventId: "Event id is not valid",
    titleIsCompulsory: "Title is compulsory",
    createEventSuccess: "Event created successfully",
    updateEventSuccess: "Event updated successfully",
    getEventSuccess: "Get event successfully"
  },
  eventFeature: {
    aliasIsCompulsory: "Alias is compulsory",
    createFeatureSuccess: "Feature created successfully",
    updateFeatureSuccess: "Feature updated successfully",
    getFeatureSuccess: "Get features successfully",
    getMenusSuccess: "Get menus  successfully",
    featureNotSelected: "feature is not selected"
  },
  container: {
    nameIsCompulsory: "Title should  not be empty",
    createContainerSuccess: "Container created successfully"
  },
  agenda: {
    agenaCreateSuccess: "Agenda created successfully",
    agendaIdCompulsory: "Agenda id is compulsory",
    invalidAgendaId: "Agenda id is not valid",
    agendaUpdateSuccess: "Agenda updated successfully",
    getAgendaSuccess: "get agendas successfully",
    agendaImportSuccess: "Agenda imported successfully",
    addAgendaSpeakerSuccess: "Agenda speaker added successfully",
    removeAgendaSpeakerSuccess: "Agenda speaker removed successfully"
  },
  speaker: {
    speakerIdCompulsory: "Speaker id is compulsory",
    invalidSpeakerId: "Speaker id is not valid",
    speakerCreateSuccess: "Speaker created successfully",
    speakerUpdateSuccess: "Speaker created successfully",
    getSpeakerSuccess: "Get speaker successfully",
    importSpeakerSuccess: "Speaker imported successfully",
    speakerAlreadyExist: "Speaker already exist",
    speakerExistCannotUpdateSpeaker:
      "Speaker already exist cannot update spaker"
  },
  attendee: {
    attendeeIdCompulsory: "Attendee id is compulsory",
    invalidAttendeeId: "Attendee id is not valid",
    attendeeCreateSuccess: "Attendee created successfully",
    attendeeUpdateSuccess: "Attendee created successfully",
    getAttendeeSuccess: "Get attendee successfully",
    importAttendeeSuccess: "Attendee imported successfully",
    attendeeAlreadyExist: "Attendee already exist",
    attendeeExistCannotUpdateSpeaker:
      "Attendee already exist cannot update spaker"
  },
  contactUs: {
    contactUsIdCompulsory: "Contact us id is compulsory",
    invalidContactUsId: "Contact us id is not valid",
    contactUsCreateSuccess: "Contact us created successfully",
    contactUsUpdateSuccess: "Contact us updated successfully",
    getContactUsSuccess: "Get contact us successfully",
    contactUsAlreadyExist: "Contact us already exist",
    contactUsExistCannotUpdate: "contact us already exist cannot update contact"
  },
  exhibitor: {
    exhibitorIdCompulsory: "Exhibitor id is compulsory",
    invalidExhibitorId: "Exhibitor id is not valid",
    exhibitorCreateSuccess: "Exhibitor created successfully",
    exhibitorUpdateSuccess: "Exhibitor created successfully",
    getExhibitorSuccess: "Get exhibitor successfully",
    importExhibitorSuccess: "Exhibitor imported successfully",
    exhibitorAlreadyExist: "Exhibitor already exist",
    exhibitorExistCannotUpdateSpeaker:
      "Exhibitor already exist cannot update spaker"
  },
  sponsor: {
    sponsorIdCompulsory: "Sponsor id is compulsory",
    invalidSponsorId: "Sponsor id is not valid",
    sponsorCreateSuccess: "Sponsor created successfully",
    sponsorUpdateSuccess: "Sponsor created successfully",
    getSponsorSuccess: "Get sponsor successfully",
    importSponsorSuccess: "Sponsor imported successfully",
    sponsorAlreadyExist: "Sponsor already exist",
    sponsorExistCannotUpdateSpeaker:
      "Sponsor already exist cannot update spaker"
  },
  feedback: {
    feedbackIdCompulsory: "Feedback id is compulsory",
    invalidFeedbackId: "Feedback id is not valid",
    feedbackCreateSuccess: "Feedback created successfully",
    feedbackUpdateSuccess: "Feedback created successfully",
    getFeedbackSuccess: "Get feedback successfully",
    questionIsCompulsory: "Question is compulsory",
    questionTypeIsCompulsory: "Question type is compulsory"
  },
  infoBooth: {
    infoBoothIdCompulsory: "InfoBooth id is compulsory",
    invalidInfoBoothId: "InfoBooth id is not valid",
    infoBoothCreateSuccess: "InfoBooth created successfully",
    infoBoothUpdateSuccess: "InfoBooth created successfully",
    getInfoBoothSuccess: "Get InfoBooth successfully",
    titleIsCompulsory: "Title is compulsory",
    contentIsCompulsory: "Content is compulsory"
  },
  webPage: {
    webPageIdCompulsory: "Web page id is compulsory",
    invalidWebPageId: "Web page id is not valid",
    webPageCreateSuccess: "Web page created successfully",
    webPageUpdateSuccess: "Web page updated successfully",
    getWebPageSuccess: "Get web page successfully",
    urlIsCompulsory: "url is compulsory"
  }
};
