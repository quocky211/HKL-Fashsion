import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';
function Dashboard()
{

    return (
      <div>
        <Topbar />
        <div className="container-admin">
          <Sidebar/>
            
        </div>
      </div>
    );
}
export default Dashboard;