using Optional;
using Triplex.Validations;

namespace RI.Novus.Core.Users;

///<summary>Represents EntityWithAllSupportedPropertyTypesRequired entity. </summary>
public sealed class EntityWithAllSupportedPropertyTypesRequired 
{
	///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's Id. </summary>
	public Id Id { get; }

	///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's Names. </summary>
	public Names Names { get; }

	///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's Salary. </summary>
	public Salary Salary { get; }

	///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's Age. </summary>
	public Age Age { get; }

	///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's Birthday. </summary>
	public Birthday Birthday { get; }

	///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's Status. </summary>
	public Status Status { get; }

	///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's IsValid. </summary>
	public bool IsValid { get; }

	private EntityWithAllSupportedPropertyTypesRequired(Builder builder)
	{
		Arguments.NotNull(builder, nameof(builder));
		Id = builder.IdOption.ValueOrFailure();
		Names = builder.NamesOption.ValueOrFailure();
		Salary = builder.SalaryOption.ValueOrFailure();
		Age = builder.AgeOption.ValueOrFailure();
		Birthday = builder.BirthdayOption.ValueOrFailure();
		Status = builder.StatusOption.ValueOrFailure();
		IsValid = builder.IsValidOption.ValueOrFailure();
	}

	/// TODO: Remember to write tests for business logic
	/// TODO: and then if code coverage decreases comment or delete the code not used

	///<summary>EntityWithAllSupportedPropertyTypesRequired's builder. </summary>
	public sealed class Builder : AbstractEntityBuilder<EntityWithAllSupportedPropertyTypesRequired>
	{
		protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();
		protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();
		internal Option<Id> IdOption { get; private set; }

		internal Option<Names> NamesOption { get; private set; }

		internal Option<Salary> SalaryOption { get; private set; }

		internal Option<Age> AgeOption { get; private set; }

		internal Option<Birthday> BirthdayOption { get; private set; }

		internal Option<Status> StatusOption { get; private set; }

		internal Option<bool> IsValidOption { get; private set; }

		private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);

		/// <inheritdoc />
		protected override EntityWithAllSupportedPropertyTypesRequired DoBuild()
		{
			State.IsTrue(IdOption.HasValue, "EntityWithAllSupportedPropertyTypesRequired's Id is missing");
			State.IsTrue(NamesOption.HasValue, "EntityWithAllSupportedPropertyTypesRequired's Names is missing");
			State.IsTrue(SalaryOption.HasValue, "EntityWithAllSupportedPropertyTypesRequired's Salary is missing");
			State.IsTrue(AgeOption.HasValue, "EntityWithAllSupportedPropertyTypesRequired's Age is missing");
			State.IsTrue(BirthdayOption.HasValue, "EntityWithAllSupportedPropertyTypesRequired's Birthday is missing");
			State.IsTrue(StatusOption.HasValue, "EntityWithAllSupportedPropertyTypesRequired's Status is missing");
			State.IsTrue(IsValidOption.HasValue, "EntityWithAllSupportedPropertyTypesRequired's IsValid is missing");

			return new EntityWithAllSupportedPropertyTypesRequired(this);
		}

		public Builder WithId(Id id)
		    => SetProperty(() => IdOption = Arguments.NotNull(id, nameof(id)).SomeNotNull());

		public Builder WithNames(Names names)
		    => SetProperty(() => NamesOption = Arguments.NotNull(names, nameof(names)).SomeNotNull());

		public Builder WithSalary(Salary salary)
		    => SetProperty(() => SalaryOption = Arguments.NotNull(salary, nameof(salary)).SomeNotNull());

		public Builder WithAge(Age age)
		    => SetProperty(() => AgeOption = Arguments.NotNull(age, nameof(age)).SomeNotNull());

		public Builder WithBirthday(Birthday birthday)
		    => SetProperty(() => BirthdayOption = Arguments.NotNull(birthday, nameof(birthday)).SomeNotNull());

		public Builder WithStatus(Status status)
		    => SetProperty(() => StatusOption = Arguments.ValidEnumerationMember(status, nameof(status)).SomeNotNull());

		public Builder WithIsValid(bool isValid)
		    => SetProperty(() => IsValidOption = Arguments.NotNull(isValid, nameof(isValid)).SomeNotNull());

	}
}
