import Footer from '../Footer/';
import Header from '../Header/';
import AppRoutes from '../Routes/Routes';
import Sidebar from '../Sidebar/';
import UserForm from '../User/UserForm';

const App = () => {
  return (
    <div className='app'>
      <Header />
      <UserForm />
      <div className='container'>
        <Sidebar />
        <AppRoutes />
      </div>

      <Footer />
    </div>
  );
};

export default App;
