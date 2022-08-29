import { observer } from 'mobx-react-lite';
import useStore from "./hooks/useStore";
import Dashboard from "./components/dashboard";
import Header from "./components/header";

function App() {

  const { users, boards } =  useStore();

  console.log("active board >>", boards.active?.sections[0]?.tasks?.toJSON());

  return (
    <>
      <Header />
      <main>
        <Dashboard />
      </main>
    </>

  );
}

export default observer(App);
