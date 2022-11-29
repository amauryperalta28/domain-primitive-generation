using Optional;
using Triplex.Validations;

namespace RI.Novus.Core.Users;

///<summary>Represents CitizenWithOneRequiredProperty entity. </summary>
public sealed class CitizenWithOneRequiredProperty 
{
	///<summary>Represents CitizenWithOneRequiredProperty's Id. </summary>
	public Id Id { get; }

	private CitizenWithOneRequiredProperty(Builder builder)
	{
		Arguments.NotNull(builder, nameof(builder));
		Id = builder.IdOption.ValueOrFailure();
	}

	/// TODO: Remember to write tests for business logic
	/// TODO: and then if code coverage decreases comment or delete the code not used

	///<summary>CitizenWithOneRequiredProperty's builder. </summary>
	public sealed class Builder : AbstractEntityBuilder<CitizenWithOneRequiredProperty>
	{
		/// <inheritdoc />
		protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();

		/// <inheritdoc />
		protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();

		internal Option<Id> IdOption { get; private set; }

		private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);

		/// <inheritdoc />
		protected override CitizenWithOneRequiredProperty DoBuild()
		{
			State.IsTrue(IdOption.HasValue, "CitizenWithOneRequiredProperty's Id is missing");

			return new CitizenWithOneRequiredProperty(this);
		}

		/// <summary>
		/// Sets CitizenWithOneRequiredProperty's id
		/// <param name="id"></param>
		/// <returns></returns>
		public Builder WithId(Id id)
		    => SetProperty(() => IdOption = Arguments.NotNull(id, nameof(id)).SomeNotNull());

	}
}
