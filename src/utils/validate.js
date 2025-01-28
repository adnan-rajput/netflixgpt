export const validateSignIn = (email , password) => {
 
    const testEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const testPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
    
    if (!testEmail) return 'Inavlid Email !!';
    if (!testPassword) return 'Inavlid Password !!';

    return null;
    
}