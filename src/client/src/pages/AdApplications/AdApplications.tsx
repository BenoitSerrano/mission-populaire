import { useParams } from 'react-router-dom';
import { Query } from '../../components/Query';
import { missionsApi } from '../../lib/api/missionsApi';
import { ApplicationsTable } from './ApplicationsTable';

function AdApplications() {
    const params = useParams<{ missionId: string }>();
    const missionId = params.missionId as string;
    const getAdWithApplications = () => missionsApi.getAdWithApplications(missionId);
    return (
        <Query apiCall={getAdWithApplications} queryKey={['ads', missionId, 'with-applications']}>
            {({ applications }) => <ApplicationsTable applications={applications} />}
        </Query>
    );
}

export { AdApplications };
