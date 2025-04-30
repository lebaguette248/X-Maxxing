const API_URL = "http://192.168.1.37:3000"; // TODO: Replace with ENV



export async function createUser(username:string, email:string) {
    try{
        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email })
          });
          const data = await res.json();
          console.log(data);
    } catch (error) {
        console.error('Error creating user:', error, "Username:", username, "Email:", email);
        console.error('Types of the provided values:', typeof username, typeof email);
    }
}
