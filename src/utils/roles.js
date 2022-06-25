const roles = {
  basic: {
    search: false,
    photo: false,
    additional: false,
    view: false,
    social: false,
    video: false,
  },
  silver: {
    search: true,
    photo: false,
    additional: false,
    view: true,
    social: false,
    video: false,
  },
  gold: {
    search: true,
    photo: true,
    additional: true,
    view: true,
    social: false,
    video: false,
  },
  platinum: {
    search: true,
    photo: true,
    additional: true,
    view: true,
    social: true,
    video: false,
  },
  personalised: {
    search: true,
    photo: true,
    additional: true,
    view: true,
    social: true,
    video: true,
  },
}

export default roles
