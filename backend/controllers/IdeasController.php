<?php

namespace app\controllers;

use app\models\Ideas;
use app\models\IdeasFilterModel;
use Yii;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

class IdeasController extends RestController
{
    public function actionIndex()
    {
        $filterModel = new IdeasFilterModel();
        return $filterModel->getDataProvider(Yii::$app->request->getQueryParams());
    }

    public function actionCreate()
    {
        $model = new Ideas();
        $model->load(Yii::$app->getRequest()->getBodyParams(), '');

        if ($model->save()) {
            return $model;
        }

        if ($model->hasErrors()) {
            Yii::$app->response->setStatusCode(422);
            return $model->errors;
        }

        throw new ServerErrorHttpException();

    }

    public function actionUpdate($id)
    {
        if (($model = Ideas::findOne(['id' => $id])) !== null) {

            $model->load(Yii::$app->getRequest()->getBodyParams(), '');

            if ($model->save()) {
                Yii::$app->response->setStatusCode(201);
                return $model;
            }

            if ($model->hasErrors()) {
                Yii::$app->response->setStatusCode(422);
                return $model->errors;
            }

            throw new ServerErrorHttpException();

        }

        throw new NotFoundHttpException();

    }

    public function actionDelete($id)
    {
        if (($model = Ideas::findOne(['id' => $id])) !== null) {
            if ($model->delete() === false) {
                throw new ServerErrorHttpException('Failed to delete the object for unknown reason.');
            }
        }
        Yii::$app->getResponse()->setStatusCode(204);
    }
}
