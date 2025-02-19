import { useParams } from 'react-router-dom';
import { applicationsApi } from '../../lib/api/applicationsApi';
import { Query } from '../../components/Query';

function Application() {
    const params = useParams<{ applicationId: string }>();
    const applicationId = params.applicationId as string;
    const getApplication = () => applicationsApi.getApplication({ applicationId });
    return (
        <Query apiCall={getApplication} queryKey={['applications', applicationId]}>
            {(application) => <div />}
        </Query>
    );
}

export { Application };
