def get_ensemble_models_summary(models):
    """
    Generates model summaries of ensemble models.
    Parameters
    ----------
    models: Ensemble of models.
    """
    for model in models:
        print(model.summary())