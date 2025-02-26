import { User } from '../user';
import { buildMissionService } from './mission.service';
import { missionDtoType } from './types';

export { buildMissionController };

function buildMissionController() {
    const missionService = buildMissionService();
    const missionController = {
        getJobOffers,
        getAds,
        getJobOfferDetails,
        getAdDetails,
        getAdWithApplications,
        updateAd,
        createAd,
        deleteAd,
    };

    return missionController;

    async function getJobOfferDetails(params: { urlParams: { missionId: string } }, user: User) {
        return missionService.getJobOfferDetails(params.urlParams.missionId, user);
    }

    async function getAdDetails(params: { urlParams: { missionId: string } }, user: User) {
        return missionService.getAdDetails(params.urlParams.missionId, user);
    }

    async function getAdWithApplications(params: { urlParams: { missionId: string } }) {
        return missionService.getAdWithApplications(params.urlParams.missionId);
    }

    async function getJobOffers(_params: {}, user: User) {
        return missionService.getJobOffers(user);
    }

    async function getAds(_params: {}, user: User) {
        return missionService.getAdsByUser(user);
    }

    async function updateAd(
        params: {
            urlParams: { missionId: string };
            body: missionDtoType;
        },
        user: User,
    ) {
        return missionService.updateAd(params.urlParams.missionId, {
            title: params.body.title,
            description: params.body.description,
            deadline: params.body.deadline,
            requiredSkills: params.body.requiredSkills,
        });
    }

    async function createAd(
        params: {
            body: missionDtoType;
        },
        user: User,
    ) {
        return missionService.createAd(
            {
                title: params.body.title,
                description: params.body.description,
                deadline: params.body.deadline,
                requiredSkills: params.body.requiredSkills,
            },
            user,
        );
    }

    async function deleteAd(params: { urlParams: { missionId: string } }, user: User) {
        return missionService.deleteAd(params.urlParams.missionId, user);
    }
}
