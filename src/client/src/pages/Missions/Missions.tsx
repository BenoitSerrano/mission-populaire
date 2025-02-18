import { missionsApi } from '../../lib/api/missionsApi';
import { Query } from '../../components/Query';
import { styled, TablePagination } from '@mui/material';
import { MissionsTable } from './MissionsTable';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { locale } from '../../locale';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../lib/pathHandler';

function Missions() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const navigate = useNavigate();

    return (
        <Container>
            <Button onClick={navigateToAddMission}>{locale.missions.createMission}</Button>
            <Query
                apiCall={() => missionsApi.getMissions({ page, perPage: rowsPerPage })}
                queryKey={['missions', `${page}-${rowsPerPage}`]}
            >
                {(data) => (
                    <>
                        <MissionsTable missions={data.missions} />
                        <TablePagination
                            component="div"
                            count={data.total}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[25, 50, 100]}
                            labelRowsPerPage="Lignes par page"
                        />
                    </>
                )}
            </Query>
        </Container>
    );

    function navigateToAddMission() {
        navigate(pathHandler.getRoutePath('MISSION_CREATION'));
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    function handleChangePage(_: unknown, newPage: number) {
        setPage(newPage);
    }
}

export { Missions };

const Container = styled('div')(({ theme }) => ({ display: 'flex', flexDirection: 'column' }));
