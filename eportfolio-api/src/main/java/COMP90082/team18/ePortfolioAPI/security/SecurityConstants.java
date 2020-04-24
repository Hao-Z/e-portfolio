package COMP90082.team18.ePortfolioAPI.security;

//source:
//https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/

public class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/signup";
    public static final String SIGN_IN_URL = "/login";

    public static final String PRIVATE_KEY =
            "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJ5zd3/EG9EnrMwv" +
            "XcZe3grwPTBcQJdxvlljb2MTWwYAEi4g+MGJH35Hk9DOj4UW9RAr6l6q8ZKbTG7R" +
            "Ej+l44vZ8Z7EFeqMCyoO0K34InX79jSJZkK9wIcnKsRC1v0LH82edZW9v+7YyfT2" +
            "u6zyfyBXzx+g4x4CQfiSqdkbhbbtAgMBAAECgYAvSToyUO4UPwjcbo5HsuwEy6kX" +
            "E5DbIUCzIG+PW6lgYwkJ5yEVcLyLTQUZ3WsLRsyfpNtuoQkyvVHUCGSvxevfyhEi" +
            "6Yv9T7FvuEpKfG3lZWuHED1CtkLkJTkwMaKhVksdFfmGdezQ7bPfIIU73n0UJgFX" +
            "uI8QZ8A7Om1BKBN3gQJBANduYHiOhVQs6GgmkgPXU7ZFOxMT020/+590DJNE8iB2" +
            "6BVVcWo7JIzzRyRGi4OXlhlKdtiYL24CpUhJ7cxFAv0CQQC8SilKeE4ouin2iPux" +
            "YEnWQ2kx/eRQCT58NDLsc3QQUyTSNUMlRUvLctK6jUMaOwqOqEq5YwefDP9TyuqV" +
            "2R6xAkA4yttZzNCvUStvkYN6ycBC09tv+xEIww5VieVqyYk/L7mdLio5BCBtnBDM" +
            "KmDLLyIdxriv/ua6DK5/8SVkbWkNAkBOSj/U+ST2hkHAgsC0xiatcqYg5UKzjMRw" +
            "fHvYGUFfMFMVHJRowOF9HKdGbkpCc9415v/7CZQ3q/3WZ38XA4phAkEAqLkExQGx" +
            "+giZKCP+VX7c9hV0MopuxS5t6UDz4jLHXKYMoLI3exfqCETKFNDTTotndHMhNNul" +
            "SYBo1nZMOL2vdw==";
    public static final String PUBLIC_KEY =
            "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCec3d/xBvRJ6zML13GXt4K8D0w" +
            "XECXcb5ZY29jE1sGABIuIPjBiR9+R5PQzo+FFvUQK+peqvGSm0xu0RI/peOL2fGe" +
            "xBXqjAsqDtCt+CJ1+/Y0iWZCvcCHJyrEQtb9Cx/NnnWVvb/u2Mn09rus8n8gV88f" +
            "oOMeAkH4kqnZG4W27QIDAQAB";
}
