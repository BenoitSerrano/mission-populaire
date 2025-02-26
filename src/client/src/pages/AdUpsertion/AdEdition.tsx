import { useParams } from 'react-router-dom';
import { Query } from '../../components/Query';
import { missionsApi } from '../../lib/api/missionsApi';
import { AdEditionForm } from './AdEditionForm';

function AdEdition() {
    const params = useParams<{ missionId: string }>();
    const missionId = params.missionId as string;
    const getAdDetails = () => missionsApi.getAdDetails(missionId);

    return (
        <Query apiCall={getAdDetails} queryKey={['ads', missionId]}>
            {(data) => <AdEditionForm ad={data} />}
        </Query>
    );
}

export { AdEdition };
