// simple base64 encoding for url-safe obscuring of userIds.
export function Obscure(userId: string): string{
    let userIdPadded = userId
    if(userId.length % 3 == 1){
        userIdPadded = userId + "**"
    } else if (userId.length % 3 == 2){
        userIdPadded = userId + "*"
    }
    return btoa(encodeURIComponent(userIdPadded))
}

export function Unobscure(userIdEncoded: string): string{
    const decodedPadded = atob(userIdEncoded)
    return decodedPadded.replaceAll("*", "")
}