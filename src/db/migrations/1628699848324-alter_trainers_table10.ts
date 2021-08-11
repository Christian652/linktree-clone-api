import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTrainersTable101628699848324 implements MigrationInterface {
    name = 'alterTrainersTable101628699848324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `links` ADD `title` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `links` ADD `color` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `links` DROP COLUMN `color`");
        await queryRunner.query("ALTER TABLE `links` DROP COLUMN `title`");
    }

}
