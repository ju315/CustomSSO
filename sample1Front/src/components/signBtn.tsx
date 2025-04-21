interface props {
  title: string;
  btnColor: string;
  onClick: () => void;
}

const SignBtn = ({ title, btnColor, onClick }: props) => {
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();

          onClick();
        }}
        style={{
          width: '100%',
          height: '50px',
          backgroundColor: btnColor,
          color: 'white',
          cursor: 'pointer',
          borderRadius: '7px',
          borderColor: 'white',
        }}
      >
        {title}
      </button>
    </div>
  );
};

export default SignBtn;
