import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTrainersTable91628698358090 implements MigrationInterface {
    name = 'alterTrainersTable91628698358090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, UNIQUE INDEX `IDX_bc0c27d77ee64f0a097a5c269b` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `links` (`id` int NOT NULL AUTO_INCREMENT, `url` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `log` (`id` int NOT NULL AUTO_INCREMENT, `operation_type` varchar(255) NOT NULL, `object_type` varchar(255) NOT NULL, `data` text NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `links` ADD CONSTRAINT `FK_56668229b541edc1d0e291b4c3b` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `links` DROP FOREIGN KEY `FK_56668229b541edc1d0e291b4c3b`");
        await queryRunner.query("DROP TABLE `log`");
        await queryRunner.query("DROP TABLE `links`");
        await queryRunner.query("DROP INDEX `IDX_bc0c27d77ee64f0a097a5c269b` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
