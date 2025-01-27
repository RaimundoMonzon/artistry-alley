export const routePaths = {
    "auth": {
      "register": "/register",
      "login": "/login",
      "logout": "/logout"
    },
    "user": {
      "getUserArtworks": "/:userId/artworks",
      "getUserExhibitions": "/:userId/exhibitions",
      "getUserProfile": "/profile",
      "updateUserProfile": "/profile",
      "removeArtworkFromUser": "/:userId/artworks/:artworkId",
      "removeExhibitionFromUser": "/:userId/exhibitions/:exhibitionId",
      "getAllUsers": "/",
      "getUser": "/:userId",
      "createUser": "/",
      "updateUser": "/:userId",
      "deleteUser": "/:userId"
    },
    "receipt": {
      "createReceipt": "/",
      "getReceiptById": "/:id",
      "deleteReceipt": "/:id"
    },
    "payment": {
      "processPayment": "/processPayment"
    },
    "exhibition": {
      "createExhibition": "/",
      "updateExhibition": "/:id",
      "deleteExhibition": "/:id",
      "deleteExhibitionAdmin": "/admin/:id",
      "getAllExhibitions": "/",
      "getExhibitionById": "/:id"
    },
    "contact": {
      "sendContactForm": "/:id",
      "getAllContactForms": "/",
      "getContactForm": "/:id"
    },
    "category": {
      "getAllCategories": "/",
      "createCategory": "/",
      "updateCategory": "/:id",
      "deleteCategory": "/:id"
    },
    "cart": {
      "createCart": "/",
      "getCurrentCart": "/current",
      "addItemToCart": "/addItem/:itemId",
      "deleteItemFromCart": "/deleteItem/:itemId",
      "updateItemQuantity": "/updateItem/:itemId",
      "clearCart": "/clear"
    },
    "artwork": {
      "createArtwork": "/",
      "updateArtwork": "/:id",
      "deleteArtwork": "/:id",
      "deleteArtworkAdmin": "/admin/:id",
      "getAllArtworks": "/",
      "getArtwork": "/:id"
    }
  }  