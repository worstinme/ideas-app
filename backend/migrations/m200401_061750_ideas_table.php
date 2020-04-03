<?php

use yii\db\Migration;
use yii\db\Schema;

/**
 * Class m200401_061750_ideas_table
 */
class m200401_061750_ideas_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('ideas', [
            'id' => $this->primaryKey()->unsigned(),
            'title' => $this->string()->notNull(),
            'status' => $this->tinyInteger()->defaultValue(0),
            'rating' => $this->integer()->defaultValue(0),
        ]);

        $this->execute('INSERT INTO ideas
    SELECT
        generate_series(1,10000000),
        substr(concat(md5(random()::text), md5(random()::text)), 1, (random() * 64)::integer + 1),
        ((random() * 3)::integer - 1),
        ((random() * 2000)::integer - 500);');

        $this->execute('ALTER SEQUENCE ideas_id_seq RESTART WITH 10000001');

        $this->createIndex('idx-ideas-status-rating-id', 'ideas', ['status', 'rating', 'id']);
        $this->createIndex('idx-ideas-status-id', 'ideas', ['status', 'id']);
        $this->createIndex('idx-ideas-rating-id', 'ideas', ['rating', 'id']);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m200401_061750_ideas_table cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m200401_061750_ideas_table cannot be reverted.\n";

        return false;
    }
    */
}
