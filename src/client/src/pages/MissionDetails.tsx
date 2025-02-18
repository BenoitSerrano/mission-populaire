import { useParams } from 'react-router-dom';
import { missionsApi } from '../lib/api/missionsApi';
import { Query } from '../components/Query';

function MissionDetails() {
    const params = useParams<{ missionId: string }>();
    const missionId = params.missionId as string;
    const getMissionDetails = () => missionsApi.getMissionDetails(missionId);

    return (
        <>
            <Query apiCall={getMissionDetails} queryKey={['me', 'missions', missionId, 'details']}>
                {(data) => (
                    <div>
                        <h1>{data.title}</h1>
                        <h3>Évènements</h3>
                    </div>
                )}
            </Query>
        </>
    );
}

export { MissionDetails };
