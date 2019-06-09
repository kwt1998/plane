const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  type: state => state.user.type,
  phone: state => state.user.phone,
  mail: state => state.user.mail,
  sex: state => state.user.sex,
  age: state => state.user.age
}
export default getters
