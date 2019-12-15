module.exports = {
  auth: {
    signin: "/signin",
    googleSignin: "/google-signin",
    signup: "/signup",
    logout: "/logout",
    verifyUser: "/verify-user/:token",
    updatePassword: "/update-password",
    resetPassword: "/reset-password",
    forgotPassword: "/forgot-password/:email",
    forgotPasswordValidate: "/forgot-password-validate/:token"
  },
  common: {
    uploadImage: "/upload-image",
    uploadDocuments: "/upload-documents",
    deleteDocument: "/delete-document/:documentId",
    addDocument: "add-document/:source"
  },
  user: {
    addUserRole: "/add-user-role",
    updateUserRole: "/update-user-role",
    getUserRole: "/get-user-roles",
    getAccounts: "/get-accounts",
    getUserDetail: "/get-user-detail"
  },
  container: {
    create: "/create",
    getContainer: "/get-container",
    getEventByContainer: "/get-container-events/:containerId"
  },
  eventFeature: {
    addEventFeature: "/add-event-feature",
    updateEventFeature: "/update-event-feature",
    getFeatures: "/get-features",
    getEventFeatures: "/get-event-features/:eventId"
  },
  event: {
    create: "/create",
    update: "/update",
    getEvents: "/get-events",
    findEvent: "/find-event/:eventId"
  },
  agenda: {
    addAgenda: "/add-agenda",
    updateAgenda: "/update-agenda",
    getEventAgenda: "/get-event-agenda",
    findEventAgenda: "/find-event-agenda/:agendaId",
    addAgendaSpeaker: "/add-agenda-speaker",
    deleteAgendaSpeaker: "/delete-agenda-speaker",
    importAgendas: "/import-agendas",
    addDocument: "/add-document"
  },
  attendee: {
    addAttendee: "/add-attendee",
    updateAttendee: "/update-attendee",
    getEventAttendees: "/get-event-attendees",
    importAttendees: "/import-attendees"
  },
  sponsor: {
    addSponsor: "/add-sponsor",
    updateSponsor: "/update-sponsor",
    getEventSponsor: "/get-event-sponsors",
    importSponsors: "/import-sponsors",
    addDocument: "/add-document"
  },
  speaker: {
    addSpeaker: "/add-speaker",
    updateSpeaker: "/update-speaker",
    getEventSpeaker: "/get-event-speaker",
    findEventSpeaker: "/find-event-speaker/:speakerId",
    importSpeakers: "/import-speakers",
    getEventAgendaAllSpeaker: "/get-event-all-speaker"
  },
  exhibitor: {
    addExhibitor: "/add-exhibitor",
    updateExhibitor: "/update-exhibitor",
    getEventExhibitors: "/get-event-exhibitors",
    importExhibitors: "/import-exhibitors",
    addDocument: "/add-document"
  },
  infobooth: {
    addInfobooth: "/add-infobooth",
    updateInfobooth: "/update-infobooth",
    getEventInfobooths: "/get-event-infobooths"
  },
  feedback: {
    addFeedback: "/add-feedback",
    updateFeedback: "/update-feedback",
    getEventFeedbacks: "/get-event-feedbacks"
  },
  contactUs: {
    addContactUs: "/add-contact-us",
    updateContactUs: "/update-contact-us",
    getEventContactUs: "/get-event-contact-us"
  },
  webPage: {
    addWebPage: "/add-web-page",
    updateWebPage: "/update-web-page",
    getEventWebPage: "/get-event-web-pages"
  }
};
