<?php


namespace app\models;


use app\components\DataProvider;

/**
 *
 * @property DataProvider $dataProvider
 */
class IdeasFilterModel extends Ideas
{
    const STATUS_VALUES = [-1, 0, 1, 2];

    public function rules()
    {
        return [
            ['status', 'in', 'range' => self::STATUS_VALUES],
        ];
    }

    public function getDataProvider($params = [])
    {
        $query = self::find();

        $dataProvider = new DataProvider([
            'query' => $query,
            'sort' => [
                'attributes' => [
                    'id',
                    'rating' => [
                        'asc' => ['rating' => SORT_ASC, 'id' => SORT_ASC],
                        'desc' => ['rating' => SORT_DESC, 'id' => SORT_DESC],
                        'default' => SORT_DESC,
                        'label' => 'By rating',
                    ],
                ],
                'defaultOrder' => [
                    'id' => SORT_DESC
                ]
            ],
            'pagination' => [
                'defaultPageSize' => 50,
                'pageSizeLimit' => [1,1000],
                'pageSizeParam' => 'limit',
            ]
        ]);

        $this->load($params, '');

        if (!$this->validate()) {
            return $dataProvider;
        }

        if ($this->status !== null) {
            $query->andWhere(['status' => $this->status]);
        }

        return $dataProvider;

    }
}
