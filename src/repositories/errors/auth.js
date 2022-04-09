export class PartialCredError extends Error {
  constructor (fields) {
    const messages = []

    if ('username' in fields) {
      messages.push('username')
    }

    if ('email' in fields) {
      messages.push('email')
    }

    if ('password' in fields) {
      messages.push('password')
    }

    super('Champs obligatoire: ' + messages.join(', '))
  }
}

export class RefreshError extends Error {
  constructor () {
    super('Token is invalid or expired')
  }
}
