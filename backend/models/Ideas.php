<?php

namespace app\models;

/**
 * Class Ideas
 * @package app\models
 *
 * @property string $id [integer]
 * @property string $title [varchar(255)]
 * @property int $status [smallint]
 * @property string $rating [integer]
 */
class Ideas extends \yii\db\ActiveRecord
{
    public static function tableName()
    {
        return 'ideas';
    }

    public function rules()
    {
        return [
            ['title', 'string', 'max' => 255],
            ['title', 'required'],
            ['status', 'integer'],
            ['rating', 'integer'],
        ];
    }
}
