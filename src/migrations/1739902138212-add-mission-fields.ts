import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMissionFields1739902138212 implements MigrationInterface {
    name = 'AddMissionFields1739902138212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mission" ADD "deadline" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."mission_status_enum" AS ENUM('open', 'filled', 'completed')`);
        await queryRunner.query(`ALTER TABLE "mission" ADD "status" "public"."mission_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."mission_status_enum"`);
        await queryRunner.query(`ALTER TABLE "mission" DROP COLUMN "deadline"`);
        await queryRunner.query(`ALTER TABLE "mission" DROP COLUMN "description"`);
    }

}
