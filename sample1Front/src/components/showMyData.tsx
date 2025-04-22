import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ShowMyData = (me: any) => {
  return (
    <SyntaxHighlighter language="javascript" style={coldarkDark}>
      {JSON.stringify(me, null, 2)}
    </SyntaxHighlighter>
  );
};

export default ShowMyData;
