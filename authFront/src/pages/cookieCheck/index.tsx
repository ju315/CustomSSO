import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCookie } from '../../common/util';

const CookieCheck = () => {
  const navigator = useNavigate();
  const [query] = useSearchParams();

  useEffect(() => {
    const r = query.get('r') as string;
    const user = getCookie('user');
    const sid = getCookie('TEST.sid');

    if (!user || !sid) {
      navigator(`/sign-in?r=${encodeURIComponent(r)}`);
      return;
    }

    window.location.href = `${r}?u=${encodeURIComponent(JSON.stringify(user))}`;
  }, [query, navigator]);

  return (
    <div>
      <h1>cookie-check...</h1>
    </div>
  );
};

export default CookieCheck;
