import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { sampleApi } from '../common/axios';
import ShowMyData from '../components/showMyData';

const TmpPage = () => {
  const [query] = useSearchParams();
  const navigate = useNavigate();

  const [me, setMe] = useState();

  useEffect(() => {
    const user = query.get('u');

    if (!user) {
      goHome();
    }

    const userData = JSON.parse(user as string);
    setMe(userData);

    saveSignInData(userData);
  }, [query]);

  const goHome = () => {
    navigate('/my', { replace: true });
  };

  const saveSignInData = async (userData: any) => {
    try {
      const res = await sampleApi.post('/v3/user/sign-in', { ...userData });

      console.log('Save Sign-in data in server result:: ', res.data);
      goHome();
    } catch (err) {
      console.error('Save Sign-in data get error.', err);
      // goHome();
    }
  };

  return (
    <>
      <h1>Temporary Page</h1>
      <ShowMyData me={me} />
    </>
  );
};

export default TmpPage;
