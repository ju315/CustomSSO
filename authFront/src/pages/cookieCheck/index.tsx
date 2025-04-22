import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCookie } from '../../common/util';

const CookieCheck = () => {
  const navigator = useNavigate();
  const [query] = useSearchParams();

  useEffect(() => {
    const user = getCookie('user');
    const sid = getCookie('TEST.sid');

    if (!user || !sid) {
      const r = query.get('r') as string;
      console.log(r);

      navigator(`/sign-in?r=${encodeURIComponent(r)}`);
    }
  }, [query]);

  return (
    <div>
      <h1>cookie-check...</h1>
    </div>
  );
};

export default CookieCheck;
