import { User } from "./user"

export function userFromJson(data) {
    const user = Object.assign(new User(), data)
    return user
}
