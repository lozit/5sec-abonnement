const content = {
  free: {
    src:
      "https://images.unsplash.com/photo-1550159930-40066082a4fc?auto=format&fit=crop&w=600&h=600&q=80",
    alt: "corgi in the park with a sunset in the background",
    credit: "Jacob Van Blarcom",
    creditLink: "https://unsplash.com/photos/lkzjENdWgd8",
    message: "To view this content, you need to create an account!",
    allowedRoles: ["free", "small", "medium", "large"],
  },
  customer: {
    message: "Ceci est un texte a afficher aux abonnés uniquement",
    allowedRoles: ["small", "medium", "large"],
  },
};

exports.handler = async (event, context) => {
  const { type } = JSON.parse(event.body);
  const { user } = context.clientContext;
  const roles = user ? user.app_metadata.roles : false;
  const { allowedRoles } = content[type];

  if (!roles || !roles.some((role) => allowedRoles.includes(role))) {
    return {
      statusCode: 402,
      body: JSON.stringify({
        message: `Ce contenu necessite d'être abonné`,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(content[type]),
  };
};
