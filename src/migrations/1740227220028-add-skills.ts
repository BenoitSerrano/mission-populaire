import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSkills1740227220028 implements MigrationInterface {
    name = 'AddSkills1740227220028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "skills" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "mission" ADD "requiredSkills" text NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission" DROP COLUMN "requiredSkills"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "skills"`);
    }

}
