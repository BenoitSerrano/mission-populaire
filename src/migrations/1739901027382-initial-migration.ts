import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1739901027382 implements MigrationInterface {
    name = 'InitialMigration1739901027382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "actionPopulaireId" character varying NOT NULL, "displayName" character varying NOT NULL, CONSTRAINT "UQ_44f55dfccd3ef67d14be3df8821" UNIQUE ("actionPopulaireId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_54f1391034bc7dd30666dee0d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mission" ADD CONSTRAINT "FK_c7f94f33b61138a419093cb856d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission" DROP CONSTRAINT "FK_c7f94f33b61138a419093cb856d"`);
        await queryRunner.query(`DROP TABLE "mission"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
