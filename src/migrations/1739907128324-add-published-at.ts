import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPublishedAt1739907128324 implements MigrationInterface {
    name = 'AddPublishedAt1739907128324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission" ADD "publishedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission" DROP COLUMN "publishedAt"`);
    }

}
