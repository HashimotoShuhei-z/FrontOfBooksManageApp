import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface LoginResponse {
    token: string;
  }

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data: LoginResponse = await response.json();
      const token: string = data.token;
      // トークンをクッキーに保存する
      const expirationDate: Date = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1); // トークンの有効期限を1日に設定
      const cookieOptions: string = `path=/; expires=${expirationDate.toUTCString()}`;
      document.cookie = `token=${token}; ${cookieOptions}`;     
      // ログイン成功後のリダイレクト
      router.push('/');

    } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };
/*   const fetchSomeProtectedResource = async (token: string) => {
    try {
      const response = await fetch('/api/admin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch resource');
      }

      const resourceData = await response.json();
      // リソースのデータを使って何かする

    } catch (error) {
      setError(error.message);
    }
  };
 */
  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;