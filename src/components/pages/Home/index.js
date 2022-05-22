import { useMoralis } from "react-moralis";

const Home = ({}) => {
  const { authenticate, authError, account, isAuthenticated } = useMoralis();
  return (
    <div>
      <text>HOME PAGE</text>
      <text>{account}</text>
      <text>
        {authError && authError.name} {authError && authError.message}
      </text>
      <button onClick={authenticate}>login with moralis</button>
    </div>
  );
};

export default Home;
