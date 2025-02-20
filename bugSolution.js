// bug.js
import { unstable_getServerSession } from 'next-auth/next' 
import { authOptions } from './auth/[...nextauth]' 
export async function getServerSideProps(context) { 
  const session = await unstable_getServerSession(context, authOptions) 
  try { 
    const res = await fetch('https://api.example.com/data');
    if (!res.ok) { 
      throw new Error(`API Error! status: ${res.status}`); 
    } 
    const data = await res.json(); 
    return { 
      props: { data, session }, 
    }; 
  } catch (error) { 
    console.error('Error fetching data:', error); 
    return { 
      notFound: true, // Or redirect to an error page 
    }; 
  } 
} 
export default function MyComponent({ data, session }) { 
  // ... your component code ... 
}

// bugSolution.js
//The solution is in the bug.js file above