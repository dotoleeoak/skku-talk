'use server'

export default async function login(formData: FormData) {
  console.log(formData.get('username'))
  console.log(formData.get('password'))
  // TODO: check username and password
  // TODO: issue token
}
