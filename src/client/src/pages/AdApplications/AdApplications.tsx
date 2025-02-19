import { useParams } from 'react-router-dom';
import { Query } from '../../components/Query';
import { missionsApi } from '../../lib/api/missionsApi';
import { ApplicationsTable } from './ApplicationsTable';

function AdApplications() {
    const params = useParams<{ missionId: string }>();
    const missionId = params.missionId as string;
    const getMissionWithApplications = () => missionsApi.getMissionWithApplications(missionId);
    return (
        <Query
            apiCall={getMissionWithApplications}
            queryKey={['me', 'missions', missionId, 'with-applications']}
        >
            {({ mission, applications }) => <ApplicationsTable applications={applications} />}
        </Query>
    );
}

export { AdApplications };
