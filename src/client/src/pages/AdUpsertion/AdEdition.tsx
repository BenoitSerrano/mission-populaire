import { useParams } from 'react-router-dom';
import { Query } from '../../components/Query';
import { missionsApi } from '../../lib/api/missionsApi';
import { AdEditionForm } from './AdEditionForm';

function AdEdition() {
    const params = useParams<{ missionId: string }>();
    const missionId = params.missionId as string;
    const getMissionDetails = () => missionsApi.getMissionDetails(missionId);

    return (
        <Query apiCall={getMissionDetails} queryKey={['me', 'missions', missionId]}>
            {(data) => <AdEditionForm mission={data} />}
        </Query>
    );
}

export { AdEdition };
