class SaveUserDTO {
  constructor(payload) {
    this.first_name =
      payload.name ||
      payload.first_name ||
      payload.firstname ||
      payload.firstName;
    this.last_name =
      payload.lastname ||
      payload.last_name ||
      payload.lastname ||
      payload.lastName;
    this.email = payload.email || payload.mail;
    this.password = payload.password;
    this.github_username =
      payload.github_username ||
      payload.githubusername ||
      payload.githubUsername;
    this.role = payload.role || payload.rol;
  }
}

module.exports = SaveUserDTO;
