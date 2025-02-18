import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApplications1739915888207 implements MigrationInterface {
    name = 'AddApplications1739915888207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."application_status_enum" AS ENUM('pending', 'accepted', 'declined')`);
        await queryRunner.query(`CREATE TABLE "application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "status" "public"."application_status_enum" NOT NULL, "appliedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "missionId" uuid NOT NULL, CONSTRAINT "A militant can only apply once for a mission" UNIQUE ("userId", "missionId"), CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_b4ae3fea4a24b4be1a86dacf8a2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_9b3be0f30278a4626788e330317" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_9b3be0f30278a4626788e330317"`);
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_b4ae3fea4a24b4be1a86dacf8a2"`);
        await queryRunner.query(`DROP TABLE "application"`);
        await queryRunner.query(`DROP TYPE "public"."application_status_enum"`);
    }

}
